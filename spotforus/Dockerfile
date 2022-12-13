FROM openjdk:17
#ARG JAR_FILE=build/libs/spotforus-0.0.1-SNAPSHOT.jar/
WORKDIR /spotforus
COPY build/libs/spotforus-0.0.1-SNAPSHOT.jar /spotforus/spotforus.jar
ENTRYPOINT ["java","-jar","spotforus.jar"]
#COPY ${JAR_FILE} app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]

#docker run -d -p 3306:3306 --name spotforus-db --network spotforus-network -v dbvol:/var/lib/mysql -e MYSQL_USER=root -e MYSQL_PASSWORD=123123 -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=appdb mysql:latest
#docker run -d -p 8080:8080 --name spotforus-app --network spotforus-network spotforus/spring-boot-docker:latest