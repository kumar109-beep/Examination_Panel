from rest_framework import serializers

# Custom Imports
from ..models.courseManagementModel import *



class TypeOfCourseManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type_of_Course
        fields = '__all__'

class GetTypeOfCourseManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type_of_Course
        fields = '__all__'
        depth = 1

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = '__all__'


class GETCourseSerializer(serializers.ModelSerializer):
    typeOfCourse = TypeOfCourseManagementSerializer(many=True, read_only=True)
    class Meta:
        model = Courses
        fields = '__all__'
        depth = 1

class SubjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subjects
        fields = '__all__'


class AssignSubjectToCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignSubjectToCourse
        fields = '__all__'

class GETAssignSubjectToCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignSubjectToCourse
        fields = '__all__'
        depth = 1

class GetAssignSubjectToCourseSerializer(serializers.ModelSerializer):
    batch = CourseSerializer(many=True, read_only=True)
    subject = SubjectsSerializer(many=True, read_only=True)
    class Meta:
        model = AssignSubjectToCourse
        fields = '__all__'
        depth = 1


class AssignSubjectTotopicSerializer(serializers.ModelSerializer):
    course = CourseSerializer(many=True, read_only=True)
    subject = SubjectsSerializer(many=True, read_only=True)
    class Meta:
        model = AssignTopicToSubject
        fields = '__all__'



# Notes ###
# -->>  extra_kwargs = {'authors': {'required': False}}
# -->>  ordering = ['-id']
