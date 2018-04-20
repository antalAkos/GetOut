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

import java.util.List;
import java.util.logging.Logger;

@RestController
public class AttractionsAPI {


    @Autowired
    AttractionService attractionService;

    public AttractionsAPI(AttractionService attractionService) {
        this.attractionService = attractionService;
    }



    @GetMapping("/api/attractions")
    public String getAllAttractions() throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(attractionService.findAll());
    }


    @GetMapping("/api/attraction/{id}")
    public String getOneAttraction(@PathVariable Long id) throws JsonProcessingException {return new ObjectMapper().writeValueAsString(attractionService.findOne(id));}
}
