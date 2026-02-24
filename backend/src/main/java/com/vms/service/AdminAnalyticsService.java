package com.vms.service;

import com.vms.dto.AdminAnalyticsDto;
import com.vms.dto.CorporateDashboardDto;
import com.vms.dto.VolunteerDashboardDto;

public interface AdminAnalyticsService {
    AdminAnalyticsDto getSummary();
    CorporateDashboardDto getCorporateSummary(String corporateEmail);
    VolunteerDashboardDto getVolunteerSummary();
}
