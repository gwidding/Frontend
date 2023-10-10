<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.*"%>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>

<h2>JDBC드라이버 테스트 </h2>

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
	  out.println("제대로 연결되었습니다.");

    String sql = "insert into message values(0,?,?,now())";
    pstmt=conn.prepareStatement(sql);
    pstmt.setString(1,userID);
    pstmt.setString(2,userMessage);
    pstmt.executeUpdate();
    out.println("member 테이블에 새로운 변수 추가되었습니다");


  }catch(Exception e){ 
	 e.printStackTrace();
  }
%>
