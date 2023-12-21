# Set the base image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Set the build image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Copy the project files
COPY ["TenantManagementSystem/TenantManagementSystem.csproj", "TenantManagementSystem/"]
COPY ["Domain Layer/Domain Layer.csproj", "Domain Layer/"]
COPY ["Repository Layer/Repository Layer.csproj", "Repository Layer/"]
COPY ["Service Layer/Service Layer.csproj", "Service Layer/"]
COPY ["SharedUtilities/SharedUtilities.csproj", "SharedUtilities/"]

# Restore the dependencies for each project
WORKDIR /src/TenantManagementSystem
RUN dotnet restore

WORKDIR /src/Domain\ Layer
RUN dotnet restore

WORKDIR /src/Repository\ Layer
RUN dotnet restore

WORKDIR /src/Service\ Layer
RUN dotnet restore

WORKDIR /src/SharedUtilities
RUN dotnet restore

# Copy the entire solution and build
WORKDIR /src
COPY . .

# Build the application
WORKDIR "/src/TenantManagementSystem"
RUN dotnet build "TenantManagementSystem.csproj" -c Release -o /app/build

# Set the publish image
FROM build AS publish
RUN dotnet publish "TenantManagementSystem.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Set the final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TenantManagementSystem.dll"]
