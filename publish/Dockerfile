 Build Stage
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY . .

WORKDIR /app
COPY --from=build /app .
EXPOSE 80
EXPOSE 443

# Copy the self-signed certificate and set the environment variables
COPY jnttool.crt /https/jnttool.crt
COPY jnttool.key /https/jnttool.key
ENV ASPNETCORE_URLS=https://+:443;http://+:80
ENV ASPNETCORE_HTTPS_PORT=443

# Define the entry point for your app
ENTRYPOINT ["dotnet", "TenantManagementSystem.dll"]
