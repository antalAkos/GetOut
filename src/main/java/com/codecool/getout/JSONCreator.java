package com.codecool.getout;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

public class JSONCreator {

    @SuppressWarnings("unchecked")      //we use 3rd-party non-type-safe types...
    public  String convertResultSetToJson(ResultSet resultSet) throws SQLException
    {
        JSONArray json = new JSONArray();
        ResultSetMetaData metadata = resultSet.getMetaData();
        int numColumns = metadata.getColumnCount();

        while(resultSet.next())             //iterate rows
        {
            JSONObject obj = new JSONObject();      //extends HashMap
            for (int i = 1; i <= numColumns; ++i)           //iterate columns
            {
                String column_name = metadata.getColumnName(i);
                obj.put(column_name, resultSet.getObject(column_name));
            }
            json.add(obj);
        }
        return json.toJSONString();
    }
}
