package com.codecool.getout.services;

import com.codecool.getout.model.Attraction;
import com.codecool.getout.repository.AttractionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttractionService {

    @Autowired
    private AttractionRepository attractionRepository;

    public List<Attraction> findAll() {
        return attractionRepository.findAll();
    }
}
