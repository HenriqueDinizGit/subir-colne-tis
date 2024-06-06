import 'package:flutter/material.dart';

class bottomNavigationItem {
  final String label;
  final String route;
  final IconData icon;

  bottomNavigationItem({
    required this.label,
    required this.route,
    required this.icon,
  });
}


List<bottomNavigationItem> bottomNavigationItems = [
  bottomNavigationItem(
    label: 'Home',
    route: '/home',
    icon: Icons.home,
  ),
  bottomNavigationItem(
    label: 'Workouts',
    route: '/workouts',
    icon: Icons.iron,
  ),
  bottomNavigationItem(
    label: 'Community',
    route: '/community',
    icon: Icons.people,
  ),
  bottomNavigationItem(
    label: 'Profile',
    route: '/profile',
    icon: Icons.person,
  ),
];