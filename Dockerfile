FROM tomcat:latest
COPY dist /usr/local/tomcat/webapps
COPY build /usr/local/tomcat/webapps