import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/ui/pages/auth/login_page.dart';
import 'package:mobile/ui/pages/auth/register_page.dart';
import 'package:mobile/ui/pages/community/communities_page.dart';
import 'package:mobile/ui/pages/community/community_page.dart';
import 'package:mobile/ui/pages/shell/app_shell.dart';
import 'package:mobile/ui/pages/shell/auth_shell.dart';
import 'package:mobile/ui/pages/workouts/workout_by_id_page.dart';
import 'package:mobile/ui/pages/workouts/workouts_page.dart';
// import 'package:shared_preferences/shared_preferences.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>(debugLabel: "root");
final _authShellNavigatorKey =
    GlobalKey<NavigatorState>(debugLabel: "authShell");
final _appShellNavigatorKey = GlobalKey<NavigatorState>(debugLabel: "appShell");

class GoRouterProvider {
  static GoRouter createRouter() {
    return GoRouter(
      initialLocation: '/login',
      navigatorKey: _rootNavigatorKey,
      // redirect: (BuildContext context, GoRouterState state) async {
      //   final prefs = await SharedPreferences.getInstance();
      //   final isLoggedIn = prefs.getString('accessToken') != null;
      //   // final isLoggedIn = true;

      //   final authPages = state.fullPath != null &&
      //       (state.fullPath!.startsWith('/login') ||
      //           state.fullPath!.startsWith('/register') ||
      //           state.fullPath!.startsWith('/forgetPassword'));

      //   // print('isLoggedIn: $isLoggedIn');
      //   // print('authPages: $authPages');
      //   // print('state.path: ${state.fullPath}');

      //   if (isLoggedIn && authPages) {
      //     return '/home'; // Se estiver logado, redireciona para o dashboard se tentar acessar as páginas de autenticação
      //   }
      //   if (!isLoggedIn && !authPages) {
      //     return '/login'; // Se não estiver logado, redireciona para o login se tentar acessar qualquer outra página
      //   }
      //   return null; // no redirect
      // },
      routes: [
        ShellRoute(
          navigatorKey: _authShellNavigatorKey,
          builder: (context, state, child) => AuthShell(child: child),
          routes: [
            GoRoute(
              path: '/login',
              builder: (context, state) => const LoginPage(),
            ),
            GoRoute(
              path: '/register',
              builder: (context, state) => const RegisterPage(),
            ),
          ],
        ),
        ShellRoute(
          navigatorKey: _appShellNavigatorKey,
          builder: (context, state, child) => AppShell(child: child),
          routes: [
            GoRoute(
              path: '/workouts',
              builder: (context, state) => WorkoutsPage(),
            ),
  
            GoRoute(
              path: '/workouts/:id',
              builder: (context, state) {
                final id = state.pathParameters['id']!;
                return WorkoutByIdPage(workoutId: int.parse(id));
              },
            ),
            GoRoute(
              path: '/home',
              builder: (context, state) => Container(),
            ),
             GoRoute(
              path: '/community',
              builder: (context, state) => CommunitiesPage(),
            ),
             GoRoute(
              path: '/community/:id',
              builder: (context, state)  {
                final id = state.pathParameters['id']!;
                return CommunityPage(communityId: int.parse(id));
              },
            ),
            // GoRoute(
            //   path: '/projects',
            //   builder: (context, state) => const LoginPage(),
            // ),
            // GoRoute(
            //   path: '/project/:id',
            //   builder: (context, state) {
                // return const LoginPage();
                // return ProjectPage(id: id);
            //   },
            // ),
            // GoRoute(
            //   path: '/databases',
            //   builder: (context, state) => const LoginPage(),
            // ),
            // GoRoute(
            //   path: '/database/:id',
            //   builder: (context, state) {
                // final id = state.params['id']!;
            //     return DatabasePage(id: id);
            //   },
            // ),
          ],
        ),
      ],
    );
  }
}
