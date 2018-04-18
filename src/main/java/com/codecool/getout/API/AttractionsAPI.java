package com.codecool.getout.API;

import com.codecool.getout.model.Attraction;
import com.codecool.getout.services.AttractionService;
import com.google.gson.Gson;
import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AttractionsAPI {


    AttractionService attractionService;

    public AttractionsAPI(AttractionService attractionService) {
        this.attractionService = attractionService;
    }



    @GetMapping("/api/attractions")
    public String getAllAttractions() {
        return new Gson().toJson(attractionService.findAll());
    }


    @GetMapping("/api/attraction/{id}")
    public String getOneAttraction(@PathVariable Long id) {return new Gson().toJson(attractionService.findOne(id));}
}
