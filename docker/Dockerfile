FROM nginx:latest

# Copy the application files to the nginx web directory
COPY src/ /usr/share/nginx/html/
COPY data/ /usr/share/nginx/html/data/

# Copy the nginx configuration
COPY cfg/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]