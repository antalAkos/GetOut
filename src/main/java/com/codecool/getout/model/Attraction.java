package com.codecool.getout.model;




import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.apache.lucene.analysis.core.LowerCaseFilterFactory;
import org.apache.lucene.analysis.standard.StandardTokenizerFactory;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.search.annotations.*;
import org.hibernate.search.bridge.builtin.StringBridge;
import org.hibernate.search.bridge.builtin.impl.BuiltinIterableBridge;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Indexed
@Entity
@Table(name = "attractions")
@AnalyzerDef(name = "customanalyzer",
        tokenizer = @TokenizerDef(factory = StandardTokenizerFactory.class),
        filters = {
                @TokenFilterDef(factory = LowerCaseFilterFactory.class),
        })
public class Attraction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @Field
    private String name;

    @Field
    private String description;

    @JsonManagedReference
    @ManyToMany
    @IndexedEmbedded
    private List<Category> categories;

    @Field
    private String location;

    @CollectionTable(name = "pictures")
    @ElementCollection(fetch = FetchType.EAGER)
    @Field
    @IndexedEmbedded
    private Set<String> pictures;


    public Attraction() {
    }

    public Attraction(String name, String description, List<Category> categories, String location, Set<String> pictures) {
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

    public Set<String> getPictures() {
        return pictures;
    }

    public void setPictures(Set<String> pictures) {
        this.pictures = pictures;
    }
}
