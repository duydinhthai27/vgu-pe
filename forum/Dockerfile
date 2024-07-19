# Step 1: Use an official Node.js runtime as a parent image
FROM node:20

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json, yarn.lock
COPY package.json yarn.lock ./

# Step 4: Install dependencies using Yarn
RUN yarn

# Step 5: Copy the rest of your application
COPY . .

# Step 6: Add wait-for-it script
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

# Step 7: Add entrypoint script
COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# Step 8: Build your Next.js application
RUN yarn prisma generate
RUN yarn build

# Step 9: Define the entrypoint to run your app
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
