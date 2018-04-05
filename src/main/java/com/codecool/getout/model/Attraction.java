package com.codecool.getout.model;


import javax.persistence.*;
import java.util.List;

@Entity
public class Attraction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
    private String name;
    private String description;
    private Category category;
    private String location;
    @CollectionTable(name = "pisctures")
    @ElementCollection
    private List<String> pictures;


    public Attraction(String name, String description, Category category, String location, List<String> pictures) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.location = location;
        this.pictures = pictures;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<String> getPictures() {
        return pictures;
    }

    public void setPictures(List<String> pictures) {
        this.pictures = pictures;
    }
}
