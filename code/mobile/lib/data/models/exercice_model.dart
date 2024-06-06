// exercise_model.dart
class Exercise {
  final int id;
  final String name;
  final int workoutId;

  Exercise({required this.id, required this.name, required this.workoutId});

  factory Exercise.fromJson(Map<String, dynamic> json) {
    return Exercise(
      id: json['id'],
      name: json['name'],
      workoutId: json['workoutId'],
    );
  }
}