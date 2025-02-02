# Base image for Java
FROM openjdk:23-jdk-slim

# Set working directory
WORKDIR /app

# Copy the JAR file built by Maven or Gradle
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]