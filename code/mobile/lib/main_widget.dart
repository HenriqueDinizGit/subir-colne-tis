import 'package:flutter/material.dart';
import 'package:mobile/controllers/app_menu_controller.dart';
import 'package:mobile/services/api_service.dart';
import 'package:mobile/services/auth_service.dart';
import 'package:mobile/services/community_service.dart';
import 'package:mobile/services/exercice_serie_service.dart';
import 'package:mobile/services/exercice_service.dart';
import 'package:mobile/services/manage_share_workout_service.dart';
import 'package:mobile/services/share_workout_service.dart';
import 'package:mobile/services/workout_service.dart';
import 'package:mobile/services/workouts_complete_service.dart';
import 'package:mobile/ui/router/go_router_provider.dart';
import 'package:provider/provider.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:shared_preferences/shared_preferences.dart';


class MyApp extends StatelessWidget {
  final String baseUrl;

  const MyApp({super.key, required this.baseUrl});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: SharedPreferences.getInstance(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const CircularProgressIndicator();
          } else {
            return MultiProvider(
              providers: [
                ChangeNotifierProvider<AppMenuController>(
                  create: (_) => AppMenuController(),
                ),
                Provider<ApiService>(
                  create: (_) => ApiService(baseUrl), // Criação do ApiService
                ),
                ProxyProvider<ApiService, AuthService>(
                  update: (_, apiService, __) =>
                      AuthService(ApiService('${apiService.baseUrl}/auth')),
                ),
                ProxyProvider<ApiService, CommunityService>(
                  update: (_, apiService, __) => CommunityService(
                      ApiService('${apiService.baseUrl}/comunidade')),
                ),
                 ProxyProvider<ApiService, ShareWorkoutService>(
                  update: (_, apiService, __) => ShareWorkoutService(
                      ApiService('${apiService.baseUrl}/share-treino')),
                ),
                ProxyProvider<ApiService, ManageSharedWorkoutService>(
                  update: (_, apiService, __) => ManageSharedWorkoutService(
                      ApiService('${apiService.baseUrl}/manage-shared-treinos')),
                ),
                 ProxyProvider<ApiService, ExerciceSerieService>(
                  update: (_, apiService, __) => ExerciceSerieService(
                      ApiService('${apiService.baseUrl}/exercicio')),
                ),
                 ProxyProvider<ApiService, ExerciceService>(
                  update: (_, apiService, __) => ExerciceService(
                      ApiService('${apiService.baseUrl}/serie-exercicio')),
                ),
                 ProxyProvider<ApiService, WorkoutService>(
                  update: (_, apiService, __) => WorkoutService(
                      ApiService('${apiService.baseUrl}/treino')),
                ),
                 ProxyProvider<ApiService, WorkoutCompleteService>(
                  update: (_, apiService, __) => WorkoutCompleteService(
                      ApiService('${apiService.baseUrl}/treino-realizado')),
                ),
                
                // ProxyProvider<ApiService, UsersService>(
                //   update: (_, apiService, __) =>
                //       UsersService(ApiService('${apiService.baseUrl}/user')),
                // ),
              ],
              child: MaterialApp.router(
                debugShowCheckedModeBanner: false,
                // theme: ThemeData.dark().copyWith(
                //   scaffoldBackgroundColor: bgColor,
                //   canvasColor: bgColor,
                // ),
                localizationsDelegates: const [
                  FormBuilderLocalizations.delegate,
                  // ...GlobalMaterialLocalizations.delegates,
                  // GlobalWidgetsLocalizations.delegate,
                ],
                supportedLocales: FormBuilderLocalizations.supportedLocales,
                routerConfig: GoRouterProvider.createRouter(),
              ),
            );
          }
        });
  }
}


// rootRouter.use("/auth", authRoutes);
// rootRouter.use("/treino", treinoRouter);
// rootRouter.use("/exercicio", exercicioRouter);
// rootRouter.use("/serie-exercicio", serieExercicioRouter);
// rootRouter.use("/share-treino", shareTreinoRouter);
// rootRouter.use("/manage-shared-treinos", manageSharedTreinoRouter);
// rootRouter.use("/comunidade", comunidadeRouter);
// rootRouter.use("/treino-realizado", treinoRealizadoRouter);