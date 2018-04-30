package com.codecool.getout.API;

import com.codecool.getout.model.Attraction;
import com.codecool.getout.services.AttractionService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.sql.ResultSet;
import java.util.List;
import java.util.logging.Logger;

@RestController
public class AttractionsAPI {


    @Autowired
    AttractionService attractionService;

    public AttractionsAPI(AttractionService attractionService) {
        this.attractionService = attractionService;
    }



    @GetMapping("/api/attractions/{limit}")
    public String getAllAttractions(@PathVariable Integer limit) throws JsonProcessingException {
        List <Attraction> attractions = attractionService.findAll();
        if (limit + 5 < attractions.size()) {
            return new ObjectMapper().writeValueAsString(attractions.subList(limit, limit+5));
        }
        return "";
    }


    @GetMapping("/api/attraction/{id}")
    public String getOneAttraction(@PathVariable Long id) throws JsonProcessingException {return new ObjectMapper().writeValueAsString(attractionService.findOne(id));}
}
