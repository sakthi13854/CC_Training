package com.urlshortener.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponseDto {
    private long totalClicks;
    private long todayClicks;
    private Map<String, Long> browserStats;
    private Map<String, Long> osStats;
    private Map<String, Long> countryStats;
}
