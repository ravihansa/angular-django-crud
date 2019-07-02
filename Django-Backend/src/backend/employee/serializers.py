from rest_framework import serializers
from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'company_id', 'first_name', 'last_name', 'email',
                  'phone_number')

    def create(self, validated_data):
        instance = Employee.objects.create(**validated_data)
        return instance
