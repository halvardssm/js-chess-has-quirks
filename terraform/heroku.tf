variable "heroku_api_key" {
}

variable "heroku_user_email" {
}

provider "heroku" {
  version = "~> 2.0"
  email   = var.heroku_user_email
  api_key = var.heroku_api_key
}

### API

resource "heroku_app" "api" {
  name   = "g2-cse1500-api"
  region = "eu"

}

resource "heroku_app_release" "api" {
  app     = heroku_app.api.id
  slug_id = "g2-cse1500-api"
}

resource "heroku_formation" "api" {
  app        = heroku_app.api.id
  type       = "web"
  quantity   = 1
  size       = "free"
  depends_on = [heroku_app_release.api]
}

resource "heroku_build" "api" {
  app = heroku_app.api.id
  source = {
    path = "./"
  }
}

### UI

# resource "heroku_app" "app" {
#   name   = "g2-cse1500-app"
#   region = "us"
#   acm    = true

#   config_vars = {
#     API_URL = "https://g2-cse1500-app.herokuapp.com"
#   }
# }

# resource "heroku_app_release" "app" {
#   app     = heroku_app.app.id
#   slug_id = "g2-cse1500-app"
# }

# resource "heroku_formation" "app" {
#   app        = heroku_app.app.id
#   type       = "web"
#   quantity   = 1
#   size       = "free"
#   depends_on = [heroku_app_release.app]
# }
# Add if necessarry
# resource "heroku_domain" "app" {
#   app      = heroku_app.app.name
#   hostname = "terraform.example.com"
# }
