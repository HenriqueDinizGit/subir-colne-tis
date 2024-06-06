import 'package:animated_bottom_navigation_bar/animated_bottom_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/data/models/bottom_navigation_item.dart';

class AppShell extends StatefulWidget {
  final Widget child;

  const AppShell({Key? key, required this.child}) : super(key: key);

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> with TickerProviderStateMixin {
  //  final autoSizeGroup = AutoSizeGroup();
  var _bottomNavIndex = 0; //default index of a first screen
  var _floatingActived = false;
  // _bottomNavIndex

  late Animation<double> fabAnimation;
  late Animation<double> borderRadiusAnimation;
  late CurvedAnimation fabCurve;
  late CurvedAnimation borderRadiusCurve;

  final iconList = <IconData>[
    ...bottomNavigationItems.map(
      (item) => item.icon,
    ),
  ];

  void _activeFloating (){
    setState(() {
      _floatingActived = !_floatingActived;
    });
  }

  void _onTap(int index) {
    setState(() {
      _bottomNavIndex = index;
    });
    context.go(bottomNavigationItems[index].route);
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBody: true,
      body: Padding(
        padding: EdgeInsets.only(bottom: kBottomNavigationBarHeight),
        child: widget.child,
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.blue,
        child: Icon(
          Icons.add,
          color: Colors.amber,
          size: 32,
        ),
        onPressed: () {
          _activeFloating();
          context.go('/workouts/create');
        },
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(100),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: AnimatedBottomNavigationBar(
        icons: iconList,
        activeIndex: _floatingActived ? -2: _bottomNavIndex,
        gapLocation: GapLocation.center,
        leftCornerRadius: 32,
        rightCornerRadius: 32,
        notchSmoothness: NotchSmoothness.softEdge,
        activeColor: Colors.red,
        onTap: _onTap,
      ),
    );
  }
}
