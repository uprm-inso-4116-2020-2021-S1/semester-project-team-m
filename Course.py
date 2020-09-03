class Course:

    def __init__(self):

        self.code = int()
        self.abbreviation = str()

        self.course_code = self.abbreviation + str(self.code)
        self.worth = int()
        self.modality = None
        self.term = None


    def type(self) -> str:
        if str(self.code)[0] is 3:
            return "Basic Course"
        elif str(self.code)[0] is 4:
            return "Advance Course"
        elif str(self.code)[0] is 5:
            return "Master Course"
        elif str(self.code)[0] is 6:
            return "Doctor Course"
        else:
            return "Invalid Course"

    def __repr__(self):
        return "{} - {}".format(self.course_code, self.section)

    def requirements(self) -> str:
        self.preres = str()
        self.cores = str()

    def professor(self, value=None):

        if value is not None and self.professor is None:
            self.professor = value

        if value is None and self.professor is None:
            return self.professor

        return self.professor

