# Use the official .NET 7 SDK as a build image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

# Set the working directory to /app
WORKDIR /app

# Copy the .csproj and restore dependencies
COPY *.csproj ./

RUN dotnet restore

# Copy the remaining source code
COPY . .

# Build the application
RUN dotnet publish -c Release -o out

# Use the official ASP.NET Core runtime as a base image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime

# Set the working directory to /app
WORKDIR /app

# Copy the published files from the build image
COPY --from=build /app/out ./

# Expose the port your app will run on
EXPOSE 80

# Define the entry point for your app
ENTRYPOINT ["dotnet", "TenantManagementSystem.dll"]
