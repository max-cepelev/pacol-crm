import { resolve } from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ClientsModule } from './modules/clients/clients.module';
import { DistributorsModule } from './modules/distributors/distributors.module';
import { GroupsModule } from './modules/groups/groups.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ProjectStatusesModule } from './modules/project-statuses/project-statuses.module';
import { SaleStatusesModule } from './modules/sale-statuses/sale-statuses.module';
import { TaskStatusesModule } from './modules/task-statuses/task-statuses.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { SubcategoriesModule } from './modules/subcategories/subcategories.module';
import { ProductsModule } from './modules/products/products.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { CharacteristicsModule } from './modules/characteristics/characteristics.module';
import { SalesModule } from './modules/sales/sales.module';
import { SaleContentsModule } from './modules/sale-contents/sale-contents.module';
import { UsersModule } from './modules/users/users.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { FilesModule } from './modules/files/files.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from 'nestjs-prisma';
import { getEnvPath } from './utils/env.helper';
// import { AppGateway } from './app.gateway';

const envFilePath: string = getEnvPath(`${__dirname}/envs`);
console.log(envFilePath);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        return {
          prismaOptions: {
            log: [
              'info',
              // 'query'
            ],
            datasources: {
              db: {
                url: configService.get('DATABASE_URL'),
              },
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    AuthModule,
    FilesModule,
    ClientsModule,
    DistributorsModule,
    GroupsModule,
    ProjectsModule,
    TasksModule,
    ProjectStatusesModule,
    SaleStatusesModule,
    TaskStatusesModule,
    CategoriesModule,
    SubcategoriesModule,
    ProductsModule,
    PropertiesModule,
    CharacteristicsModule,
    SalesModule,
    SaleContentsModule,
    UsersModule,
    TokensModule,
    ContactsModule,
  ],
  controllers: [],
  providers: [
    // AppGateway
  ],
})
export class AppModule {}
