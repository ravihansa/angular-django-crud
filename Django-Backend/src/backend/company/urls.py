from django.conf.urls import url
from rest_framework import routers
from .views import CompanyViewSet

router = routers.DefaultRouter()
router.register(r'company', CompanyViewSet)

urlpatterns = router.urls
