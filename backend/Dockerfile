# Build stage
FROM openjdk:23-jdk-slim AS build
WORKDIR /app

# Maven yükleme
RUN apt-get update && \
    apt-get install -y maven && \
    apt-get clean

COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM openjdk:23-jdk-slim
WORKDIR /app
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]