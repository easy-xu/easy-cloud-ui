FROM tomcat:latest
COPY dist /usr/local/tomcat/webapp
COPY build /usr/local/tomcat/webapp