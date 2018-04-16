package com.codecool.getout.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
    private String name;
    @ManyToMany
    private List<Attraction> attractions;

    public Category(String name, List<Attraction> attractions) {
        this.name = name;
        this.attractions = attractions;
    }

    public Category() {
    }

    public Category(String name) {
        this.name = name;
    }

    public int getID() {
        return ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Attraction> getAttractions() {
        return attractions;
    }

    public void setAttractions(List<Attraction> attractions) {
        this.attractions = attractions;
    }

    public void addAttraction(Attraction attraction) {
        this.attractions.add(attraction);
    }
}
