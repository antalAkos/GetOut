package com.codecool.getout.model;




import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "attractions")
public class Attraction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;
    private String name;
    private String description;
    @JsonManagedReference
    @ManyToMany
    private List<Category> categories;
    private String location;
    @CollectionTable(name = "pictures")
    @ElementCollection
    private List<String> pictures;


    public Attraction() {
    }

    public Attraction(String name, String description, List<Category> categories, String location, List<String> pictures) {
        this.name = name;
        this.description = description;
        this.categories = categories;
        this.location = location;
        this.pictures = pictures;
    }

    public Long getID() {
        return ID;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
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

    public List<Category> getCategory() {
        return categories;
    }

    public void setCategory(Category category) {
        this.categories.add(category);
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
