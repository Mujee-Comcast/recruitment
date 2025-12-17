package com.example.job.service.Impl;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.job.entity.Candidate;
import com.example.job.service.LlmService;
import com.example.job.service.ResumeService;
import com.example.job.util.IDGenerator;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class ResumeImplService implements ResumeService {

    private static final Logger logger = LoggerFactory.getLogger(ResumeImplService.class);

    @Autowired
    private LlmService llmService;

    @Autowired
    private S3Client s3Client;

    @Autowired
    private IDGenerator idGenerator;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    private static final List<String> ALLOWED_CONTENT_TYPES = Arrays.asList(
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document");

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    @Override
    public Map<String, String> uploadResume(MultipartFile file) throws IOException, Exception {
        validateFile(file);
        String candidateID = idGenerator.generateID(IDGenerator.EntityType.CANDIDATE);

        String fileName = candidateID + getFileExtension(file.getOriginalFilename());

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .contentType(file.getContentType())
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));
        String fileUrl = generateFileUrl(fileName);
        return Map.of("fileUrl", fileUrl, "candidateID", candidateID);
    }

    @Override
    public byte[] getFileFromS3(String fileUrl) throws IOException {
        try {
            String fileKey = fileUrl.replace("s3://" + bucketName + "/", "");
            var s3Object = s3Client.getObject(builder -> builder.bucket(bucketName).key(fileKey));
            return s3Object.readAllBytes();
        } catch (Exception e) {
            throw new IOException("Failed to retrieve file from S3", e);
        }
    }

    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size cannot exceed 10MB");
        }

        String contentType = file.getContentType();
        if (!ALLOWED_CONTENT_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Only PDF and DOC/DOCX files are allowed");
        }
    }

    private String getFileExtension(String fileName) {
        if (fileName == null || !fileName.contains(".")) {
            return "";
        }
        return fileName.substring(fileName.lastIndexOf("."));
    }

    private String generateFileUrl(String fileName) {
        return String.format("s3://%s/%s", bucketName, fileName);
    }

    @Override
    public Candidate parseResumeContent(String fileUrl, String candidateID) throws IOException, Exception {
        try {
            byte[] fileBytes = getFileFromS3(fileUrl);

            try (ByteArrayInputStream inputStream = new ByteArrayInputStream(fileBytes);
                    PDDocument document = PDDocument.load(inputStream)) {

                PDFTextStripper textStripper = new PDFTextStripper();
                String parsedText = textStripper.getText(document);
                Candidate candidate = llmService.formatParsedData(parsedText);
                return candidate;
            }
        } catch (IOException e) {
            throw new IOException("Failed to retrieve or parse file from S3", e);
        }
    }
}
