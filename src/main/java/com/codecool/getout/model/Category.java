package com.codecool.getout.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.search.annotations.ContainedIn;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.annotations.IndexedEmbedded;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Indexed
@Entity
@Table(name = "categories")
@NamedQueries({
        @NamedQuery(name = "Category.findByName",
                query = "select c from Category c where c.name = :name"
        )
})
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @Field
    @Column(unique = true)
    private String name;
    
    @JsonBackReference
    @ManyToMany(mappedBy = "categories", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @IndexedEmbedded(depth = 1)
    private List<Attraction> attractions;

    public Category(String name, List<Attraction> attractions) {
        this.name = name;
        this.attractions = attractions;
    }

    public Category() {
    }

    public Category(String name) {
        this.name = name;
        this.attractions = new ArrayList<>();
    }

    public Long getID() {
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



}
