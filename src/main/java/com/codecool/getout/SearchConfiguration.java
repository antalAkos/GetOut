package com.codecool.getout;


import javax.persistence.EntityManager;

import com.codecool.getout.services.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

@EnableAutoConfiguration
@Configuration
public class SearchConfiguration {

    @Autowired
    private EntityManager bentityManager;

    @Bean
    @Transactional
    public SearchService hibernateSearchService() {
        SearchService hibernateSearchService = new SearchService(bentityManager);
        hibernateSearchService.initializeHibernateSearch();
        return hibernateSearchService;
    }
}
