
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS runtime

WORKDIR /app

COPY . .

EXPOSE 80
EXPOSE 443

ENV ASPNETCORE_URLS=https://+:443;http://+:80
ENV ASPNETCORE_HTTPS_PORT=443

# Define the entry point for your app
ENTRYPOINT ["dotnet", "TenantManagementSystem.dll"]

