# This is the base dockerfile. Here the base image is pulled and the ras setup is done for the project.
# Make sure to include the base setup for lerna here.
FROM node:16 as base
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./lerna.json ./
# Package api
FROM base as api-build
WORKDIR /app/packages/api
# Here the dependencies will be installed and the local required packages bootstrapped.
# The --slim flag will cause the package json to only include the dependencies, so not all changes to the package json cause docker to reinstall all packages.
COPY  packages/api/package-slim.json package.json
WORKDIR /app/
RUN npx lerna bootstrap --scope=api --includeDependencies
WORKDIR /app/packages/api
# The normal package.json should be copied after the install into the container
COPY  packages/api/package.json ./
# This will only add the command to the dockerfile if the build script exists in the package otherwise its ignored.
RUN npm run build
# Package front
FROM base as front-build
WORKDIR /app/packages/front
# Here the dependencies will be installed and the local required packages bootstrapped.
# The --slim flag will cause the package json to only include the dependencies, so not all changes to the package json cause docker to reinstall all packages.
COPY  packages/front/package-slim.json package.json
WORKDIR /app/
RUN npx lerna bootstrap --scope=front --includeDependencies
WORKDIR /app/packages/front
# The normal package.json should be copied after the install into the container
COPY  packages/front/package.json ./
# This will only add the command to the dockerfile if the build script exists in the package otherwise its ignored.
RUN npm run build
# final stage
FROM base
COPY --from=api-build /app/packages/api /app/packages/api
COPY --from=front-build /app/packages/front /app/packages/front