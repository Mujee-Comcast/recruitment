package com.example.job.service.Impl;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.azure.ai.openai.OpenAIClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.ChatCompletionsOptions;
import com.azure.ai.openai.models.ChatRequestMessage;
import com.azure.ai.openai.models.ChatRequestSystemMessage;
import com.azure.ai.openai.models.ChatRequestUserMessage;
import com.azure.core.credential.AzureKeyCredential;
import com.example.job.entity.Candidate;
import com.example.job.service.LlmService;

@Service
public class LlmImplService implements LlmService {

    @Value("${azure.openai.api.key}")
    private String azureOpenaiApiKey;

    @Value("${azure.openai.endpoint}")
    private String azureOpenaiEndpoint;

    @Value("${azure.openai.model}")
    private String azureOpenaiModel;

    @Value("${azure.openai.temperature}")
    private double temperature;

    @Value("${azure.openai.timeout}")
    private long timeout;

    @Value("${azure.openai.max.retries}")
    private int maxRetries;

    private static final Logger logger = LoggerFactory.getLogger(LlmImplService.class);

    private OpenAIClient openAIClient;
    private ObjectMapper mapper = new ObjectMapper();

    private void initializeOpenAIClient() {
        if (openAIClient == null) {
            openAIClient = new OpenAIClientBuilder()
                    .endpoint(azureOpenaiEndpoint)
                    .credential(new AzureKeyCredential(azureOpenaiApiKey))
                    .buildClient();
        }
    }

    @Override
    public Candidate formatParsedData(String rawText) throws Exception {
        initializeOpenAIClient();
        
        String systemPrompt = "You are a resume parsing assistant. Extract structured information from resumes and return it as valid JSON matching the exact structure provided. " +
                "If any field is not present in the resume, set its value to null. " +
                "Always return a complete JSON object with all fields, even if they are null.";
        
        String userPrompt = "Extract information from this resume text and return it as JSON matching this exact structure:\n" +
                "{\n" +
                "  \"candidateID\": null,\n" +
                "  \"firstName\": \"string or null\",\n" +
                "  \"lastName\": \"string or null\",\n" +
                "  \"email\": \"string or null\",\n" +
                "  \"mobile\": \"string or null\",\n" +
                "  \"role\": \"string or null\",\n" +
                "  \"totalExperience\": \"string or null\",\n" +
                "  \"experience\": [\n" +
                "    {\n" +
                "      \"company\": \"string or null\",\n" +
                "      \"position\": \"string or null\",\n" +
                "      \"isCurrent\": true/false or null,\n" +
                "      \"startDate\": \"string or null\",\n" +
                "      \"endDate\": \"string or null\",\n" +
                "      \"responsibilities\": \"string or null\"\n" +
                "    }\n" +
                "  ],\n" +
                "  \"summary\": \"string or null\",\n" +
                "  \"primarySkills\": [\"skill1\", \"skill2\"] or null,\n" +
                "  \"secondarySkills\": [\"skill1\", \"skill2\"] or null,\n" +
                "  \"education\": [\n" +
                "    {\n" +
                "      \"institution\": \"string or null\",\n" +
                "      \"degree\": \"string or null\",\n" +
                "      \"fieldOfStudy\": \"string or null\",\n" +
                "      \"graduationYear\": \"string or null\",\n" +
                "      \"grade\": \"string or null\"\n" +
                "    }\n" +
                "  ],\n" +
                "  \"certifications\": [\"cert1\", \"cert2\"] or null,\n" +
                "  \"resumeLink\": null\n" +
                "}\n\n" +
                "Resume text:\n" + rawText +
                "\n\nReturn only valid JSON with no additional text or explanation.";
        
        List<ChatRequestMessage> messages = new ArrayList<>();
        messages.add(new ChatRequestSystemMessage(systemPrompt));
        messages.add(new ChatRequestUserMessage(userPrompt));

        ChatCompletionsOptions options = new ChatCompletionsOptions(messages)
                .setModel(azureOpenaiModel)
                .setTemperature(temperature)
                .setMaxTokens(3000);

        try {
            var response = openAIClient.getChatCompletions(azureOpenaiModel, options);
            String json = response.getChoices().get(0).getMessage().getContent();
            
            // Clean up the JSON response in case it has markdown formatting
            json = json.replaceAll("```json", "").replaceAll("```", "").trim();
            
            Candidate candidate = mapper.readValue(json, Candidate.class);
            return candidate;
        } catch (Exception e) {
            throw new RuntimeException("Failed to process resume with Azure OpenAI: " + e.getMessage(), e);
        }
    }

}
