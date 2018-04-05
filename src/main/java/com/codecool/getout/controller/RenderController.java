package com.codecool.getout.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class RenderController {

    @RequestMapping(value ="/", method = RequestMethod.GET)
    public String indexPage(Model model) {
        return "index";
    }
}
