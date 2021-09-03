FROM tomcat:latest
COPY dist /usr/local/tomcat/webapp
COPY WEB-INF /usr/local/tomcat/webapp