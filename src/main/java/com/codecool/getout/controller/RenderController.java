package com.codecool.getout.controller;


import com.codecool.getout.model.Attraction;
import com.codecool.getout.repository.AttractionRepository;
import com.sun.org.apache.xpath.internal.operations.Mod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class RenderController {

    @Autowired
    private AttractionRepository attractionRepository;

    @RequestMapping(value ="/", method = RequestMethod.GET)
    public String indexPage(Model model) {
        model.addAttribute("attractions", attractionRepository.findAll());
        model.addAttribute("map", "https://www.google.com/maps/embed/v1/place?key=AIzaSyCRebc8NWRCr540yhh_Sn5ucUyG4x7ib64&q=Hungary");
        return "index";
    }

    @RequestMapping(value = "/attraction/new", method = RequestMethod.GET)
    public String createNewAttraction(Model model) {
        model.addAttribute("map", "https://www.google.com/maps/embed/v1/place?key=AIzaSyCRebc8NWRCr540yhh_Sn5ucUyG4x7ib64&q=Hungary" );
        return "attractionform";
    }

    @RequestMapping(value = "/attraction/new/save", method = RequestMethod.POST)
    public void saveNewAttraction(@ModelAttribute Attraction attraction, Model model) {

    }
}
