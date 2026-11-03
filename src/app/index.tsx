import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// STUDENT DATA TYPE
type Student = {
  id: string;
  name: string;
  year: string;
  photoUrl: string;
  flagged: boolean;
};

// STUDENT CARD COMPONENT
type StudentCardProps = {
  id: string;
  name: string;
  year: string;
  photoUrl: string;
  flagged: boolean;
  onToggleFlag: (id: string) => void;
};

function StudentCard({
  id,
  name,
  year,
  photoUrl,
  flagged,
  onToggleFlag,
}: StudentCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: photoUrl }} style={styles.photo} />

      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{name}</Text>
        <Text style={styles.studentYear}>{year}</Text>

        <Pressable
          onPress={() => onToggleFlag(id)}
          style={({ pressed }) => [
            styles.flagButton,
            flagged ? styles.flaggedButton : styles.unflaggedButton,
            pressed && styles.pressedButton,
          ]}
        >
          <Text style={styles.flagButtonText}>
            {flagged ? "Flagged for Advising" : "Flag for Advising"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// STUDENT DIRECTORY COMPONENT
export default function StudentDirectory() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "s1",
      name: "Ana Cruz",
      year: "3rd Year",
      photoUrl: "https://jujutsukaisen.jp/images/chara_thumb1.png",
      flagged: false,
    },
    {
      id: "s2",
      name: "Bea Santos",
      year: "2nd Year",
      photoUrl: "https://jujutsukaisen.jp/images/chara_thumb2.png",
      flagged: false,
    },
    {
      id: "s3",
      name: "Cid Ramos",
      year: "4th Year",
      photoUrl: "https://jujutsukaisen.jp/images/chara_thumb3.png",
      flagged: false,
    },
    {
      id: "s4",
      name: "Dex Alonzo",
      year: "1st Year",
      photoUrl: "https://jujutsukaisen.jp/images/chara_thumb7.png",
      flagged: false,
    },
    {
      id: "s5",
      name: "Eli Tan",
      year: "3rd Year",
      photoUrl: "https://jujutsukaisen.jp/images/chara_thumb9.png",
      flagged: false,
    },
  ]);

  // SEARCH STATE
  const [query, setQuery] = useState("");

  // TOGGLE FLAG FUNCTION
  const toggleFlag = (id: string) => {
    setStudents((previousStudents) =>
      previousStudents.map((student) =>
        student.id === id ? { ...student, flagged: !student.flagged } : student,
      ),
    );
  };

  // FILTER STUDENTS
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Directory</Text>

      <Text style={styles.subtitle}>IT313 - Academic Advising</Text>

      {/* SEARCH BAR */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search students..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
      />

      <Text style={styles.resultText}>
        Students Found: {filteredStudents.length}
      </Text>

      {/* STUDENT LIST */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              id={student.id}
              name={student.name}
              year={student.year}
              photoUrl={student.photoUrl}
              flagged={student.flagged}
              onToggleFlag={toggleFlag}
            />
          ))
        ) : (
          <Text style={styles.noResults}>No students found.</Text>
        )}
      </ScrollView>
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5F9",
    paddingTop: 55,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1E293B",
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 5,
    marginBottom: 20,
  },

  searchInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 15,
  },

  resultText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 10,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  photo: {
    width: 75,
    height: 75,
    borderRadius: 40,
    marginRight: 15,
  },

  studentInfo: {
    flex: 1,
  },

  studentName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1E293B",
  },

  studentYear: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
    marginBottom: 10,
  },

  flagButton: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  unflaggedButton: {
    backgroundColor: "#2563EB",
  },

  flaggedButton: {
    backgroundColor: "#16A34A",
  },

  pressedButton: {
    opacity: 0.6,
  },

  flagButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },

  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "#64748B",
    marginTop: 30,
  },
});
