# DevX CLI Workflows

This document provides examples of common workflows and use cases for DevX CLI.

## Common Use Cases

### 1. Project Setup and Initialization

DevX CLI can help standardize project setup across your team:

```bash
# Create a new project directory
mkdir my-project
cd my-project

# Initialize npm
npm init -y

# Initialize DevX
devx init

# Install dependencies
npm install react react-dom
npm install --save-dev typescript webpack

# Create initial files
mkdir -p src public

# Add scripts to .devx file
# (Edit .devx manually or use a text editor)
```

### 2. Development Workflow

DevX CLI simplifies the development workflow by providing a consistent interface for common tasks:

```bash
# Start development server
devx run dev

# Run tests
devx run test

# Lint code
devx run lint

# Build for production
devx run build
```

### 3. Deployment Pipeline

DevX CLI can be used in CI/CD pipelines for consistent deployment:

```bash
# In your CI/CD pipeline script
npm install -g @devx-cli/devx

# Validate configuration
devx validate

# Run tests
devx run test

# Build for production
devx run build

# Deploy to staging
devx run deploy-staging

# Deploy to production
devx run deploy-production
```

### 4. Multi-Environment Configuration

DevX CLI can help manage different environments:

```yaml
# .devx file
project:
  name: "my-app"
  type: "web"
  language: "node"
  version: "1.0.0"

scripts:
  start: "node server.js"
  build: "webpack --config webpack.config.js"

tasks:
  - name: "start-dev"
    run: "NODE_ENV=development devx run start"
    description: "Start the server in development mode"
  
  - name: "start-prod"
    run: "NODE_ENV=production devx run start"
    description: "Start the server in production mode"
  
  - name: "build-dev"
    run: "NODE_ENV=development devx run build"
    description: "Build for development"
  
  - name: "build-prod"
    run: "NODE_ENV=production devx run build"
    description: "Build for production"

env:
  BASE_URL: "https://api.example.com"
```

### 5. Team Onboarding

DevX CLI can simplify onboarding new team members:

```bash
# Clone the repository
git clone https://github.com/example/project.git
cd project

# Install dependencies
npm install

# Install DevX CLI
npm install -g @devx-cli/devx

# Install VS Code extension
devx install-extension

# View project information
devx info

# List available scripts and tasks
devx list

# Start development
devx run dev
```

## Example Workflows

### Web Application Development

```yaml
# .devx file for a web application
project:
  name: "my-web-app"
  type: "web"
  language: "node"
  version: "1.0.0"

scripts:
  dev: "vite"
  build: "vite build"
  preview: "vite preview"
  test: "vitest"
  lint: "eslint src"

tasks:
  - name: "deploy"
    run: "npm run build && firebase deploy"
    description: "Build and deploy to Firebase"
  
  - name: "analyze"
    run: "npm run build -- --analyze"
    description: "Analyze bundle size"

env:
  VITE_API_URL: "https://api.example.com"
  VITE_AUTH_DOMAIN: "auth.example.com"
```

### API Service Development

```yaml
# .devx file for an API service
project:
  name: "my-api"
  type: "api"
  language: "node"
  version: "1.0.0"

scripts:
  dev: "nodemon src/index.js"
  start: "node src/index.js"
  test: "jest"
  lint: "eslint src"

tasks:
  - name: "migrate"
    run: "knex migrate:latest"
    description: "Run database migrations"
  
  - name: "seed"
    run: "knex seed:run"
    description: "Seed the database"
  
  - name: "docker-build"
    run: "docker build -t my-api ."
    description: "Build Docker image"
  
  - name: "docker-run"
    run: "docker run -p 3000:3000 my-api"
    description: "Run Docker container"

env:
  PORT: "3000"
  NODE_ENV: "development"
  DATABASE_URL: "postgres://user:password@localhost:5432/mydb"
```

### Library Development

```yaml
# .devx file for a library
project:
  name: "my-library"
  type: "library"
  language: "node"
  version: "1.0.0"

scripts:
  build: "tsc"
  test: "jest"
  lint: "eslint src"
  docs: "typedoc src"

tasks:
  - name: "publish"
    run: "npm run build && npm publish"
    description: "Build and publish to npm"
  
  - name: "version-patch"
    run: "npm version patch"
    description: "Bump patch version"
  
  - name: "version-minor"
    run: "npm version minor"
    description: "Bump minor version"
  
  - name: "version-major"
    run: "npm version major"
    description: "Bump major version"

env:
  NODE_ENV: "development"
```

## Best Practices

### 1. Consistent Script Naming

Use consistent naming conventions for scripts:

- `dev`: Start development server
- `build`: Build for production
- `test`: Run tests
- `lint`: Lint code
- `start`: Start production server

### 2. Task Descriptions

Always include descriptive task descriptions:

```yaml
tasks:
  - name: "deploy"
    run: "complex command with many flags"
    description: "Deploy to production environment"
```

### 3. Environment Variables

Use environment variables for configuration that changes between environments:

```yaml
env:
  API_URL: "https://api.example.com"
  DEBUG: "false"
```

### 4. Plugin Usage

Use plugins to extend functionality for specific project needs:

```yaml
plugins:
  - name: "deployment-plugin"
    path: "./plugins/deployment.js"
    config:
      target: "production"
      region: "us-west-2"
```

### 5. Documentation

Document your `.devx` file with comments:

```yaml
# Project configuration
project:
  name: "my-app"
  type: "web"
  language: "node"
  version: "1.0.0"

# Development scripts
scripts:
  # Start development server on port 3000
  dev: "vite --port 3000"
  # Production build with optimizations
  build: "vite build"
```

### 6. Version Control

Always include your `.devx` file in version control to ensure consistent development environments across your team.
