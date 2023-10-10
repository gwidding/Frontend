<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page isErrorPage="true" %>
<%@ page import="java.sql.*"%>

<%
  Connection conn=null;
  PreparedStatement pstmt=null;
  try{
    String jdbcUrl = "jdbc:mysql://localhost:3306/chatdb";
    String dbId = "root";
    String dbPass = "0409";

    String userID = request.getParameter("userid");
    String userMessage = request.getParameter("message");
    
    Class.forName("com.mysql.jdbc.Driver");
    conn = DriverManager.getConnection(jdbcUrl,dbId ,dbPass );

    String sql = "select * from message";
    pstmt=conn.prepareStatement(sql);
    ResultSet rs = pstmt.executeQuery();
    out.println("{ \"data\": [");
    int length = 0;
    String printStr = "";

    while (rs.next()) {
      printStr += "{ \"id\" : " + rs.getInt("id") + ",";
      printStr += " \"userid\" : \"" + rs.getString("userid") + "\",";
      printStr += " \"message\" : \"" + rs.getString("message") + "\",";
      printStr += " \"time\" : \"" + rs.getString("time") + "\"},";
      length++;
    }
    out.println(printStr.substring(0, printStr.length()-1));
    out.println(" ], \"length\": " + length + " }");

  } catch(Exception e){ 
	 e.printStackTrace();
  }
%>
