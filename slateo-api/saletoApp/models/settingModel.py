from django.contrib.auth.models import User
from .studentManagementModel import StudentManagement
from .authorityManagementModel import AuthorityManagement
from .reourceManagementModel import ResourceManagement
from .courseManagementModel import *
from .papermanagementModel import *
from .rolesMangementModel import *
from .requestHeadingModel import *
from .batchmanagementModel import *
from .examManagementModel import *










User._meta.get_field("email")._unique = True


# Exam Management 
ExamManagement._meta.get_field("examID")._unique = True



#custom
# Batch Management
RolesManagement._meta.get_field("roleID")._unique = True
RolesManagement._meta.get_field("roleName")._unique = True









# Paper Management
PaperManagement._meta.get_field("paperID")._unique = True
PaperManagement._meta.get_field("paperName")._unique = True


AuthorityManagement._meta.get_field("authorityName")._unique = True


#Batch Management
BatchtManagement._meta.get_field("batchID")._unique = True
BatchtManagement._meta.get_field("batchName")._unique = True



# Resource Management
# ResourceManagement._meta.get_field("employeeCode")._unique = True
ResourceManagement._meta.get_field("mobileNumber")._unique = True
# ResourceManagement._meta.get_field("emailID")._unique = True

# Admin Profile Management


#Course Management
Type_of_Course._meta.get_field("courseTypeID")._unique = True
Type_of_Course._meta.get_field("courseTypeName")._unique = True

#Course
Courses._meta.get_field("courseID")._unique = True
Courses._meta.get_field("courseName")._unique = True

# Subject
Subjects._meta.get_field("subjectID")._unique = True
Subjects._meta.get_field("subjectName")._unique = True

#Subject To Course
# AssignSubjectToCourse._meta.get_field("courseFK")._unique = True

#Subject To Topic



#Paper Management
#===================
PaperManagement._meta.get_field("paperID")._unique = True

#Paper Sections
#===================
PaperManagement._meta.get_field("paperID")._unique = True


