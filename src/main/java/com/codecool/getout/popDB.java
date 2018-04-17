package com.codecool.getout;

import com.codecool.getout.model.Attraction;
import com.codecool.getout.model.Category;
import com.codecool.getout.repository.AttractionRepository;
import com.codecool.getout.repository.CategoryRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class popDB {

    public popDB(AttractionRepository attractionRepository, CategoryRepository categoryRepository) {
        /*List<String> pictureList = new ArrayList<String>();
        List<Category> categories1 = new ArrayList<>();
        Category cat = new Category("category");
        categories1.add(cat);
        pictureList.add("https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=350");
        pictureList.add("http://diarioveaonline.com/wp-content/uploads/2018/01/best-nature-hd-wallpapers-for-desktop-21-1024x576.jpg");
        List<String> pictureList2 = new ArrayList<>();
        pictureList2.add("http://wlpapers.com/images/beautiful-clouds-beaches-nature-photography-1.jpg");
        Attraction attraction1 = new Attraction("Attraction1", "description", categories1, "place", pictureList );
        Attraction attraction2 = new Attraction("Attraction2", "descr", categories1, "place", pictureList2);
        categoryRepository.save(cat);
        attractionRepository.save(attraction1);
        attractionRepository.save(attraction2);*/

        List<String> pictureList = new ArrayList<String>();
        pictureList.add("https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=350");
        pictureList.add("http://diarioveaonline.com/wp-content/uploads/2018/01/best-nature-hd-wallpapers-for-desktop-21-1024x576.jpg");
        JSONParser parser = new JSONParser();
        try
        {
            Object object = parser
                    .parse(new FileReader(new File("src/main/java/com/codecool/getout/attractions.json").getAbsolutePath()));

            JSONArray jsonArray= (JSONArray) object;



            for (Object obj:jsonArray){
                JSONObject jsonObject = (JSONObject) obj;

                List<Category> categories = Arrays.asList(jsonObject.get("tags")).stream().map(c -> new Category(c.toString())).map(c-> categoryRepository.save(c)).collect(Collectors.toList());
                Attraction attraction = new Attraction(jsonObject.get("name_of_attraction").toString(), "", categories, jsonObject.get("address").toString(), pictureList);
                attractionRepository.save(attraction);
            }

        }
            catch(org.json.simple.parser.ParseException | IOException fe)
        {
            fe.printStackTrace();
        }


    }


}
