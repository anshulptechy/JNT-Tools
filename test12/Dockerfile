FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime

WORKDIR /app

COPY . .

# Expose both HTTP and HTTPS ports
EXPOSE 80

# Define the entry point for your app
ENTRYPOINT ["dotnet", "TenantManagementSystem.dll"]
