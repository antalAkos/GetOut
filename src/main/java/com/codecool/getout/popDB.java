package com.codecool.getout;

import com.codecool.getout.model.Attraction;
import com.codecool.getout.model.Category;
import com.codecool.getout.repository.AttractionRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class popDB {

    public popDB(AttractionRepository attractionRepository) {
        List<String> pictureList = new ArrayList<String>();
        pictureList.add("https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=350");
        pictureList.add("http://diarioveaonline.com/wp-content/uploads/2018/01/best-nature-hd-wallpapers-for-desktop-21-1024x576.jpg");
        List<String> pictureList2 = new ArrayList<>();
        pictureList2.add("http://wlpapers.com/images/beautiful-clouds-beaches-nature-photography-1.jpg");
        Attraction attraction1 = new Attraction("Attraction1", "description", Category.FOREST, "place", pictureList );
        Attraction attraction2 = new Attraction("Attraction2", "descr", Category.LAKE, "place", pictureList2);
        attractionRepository.save(attraction1);
        attractionRepository.save(attraction2);


    }



}
