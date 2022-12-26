import { Module } from '@nestjs/common';

import { ClientsModule } from './clients/clients.module';
import { DistributorsModule } from './distributors/distributors.module';
import { GroupsModule } from './groups/groups.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectStatusesModule } from './project-statuses/project-statuses.module';
import { SaleStatusesModule } from './sale-statuses/sale-statuses.module';
import { TaskStatusesModule } from './task-statuses/task-statuses.module';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { ProductsModule } from './products/products.module';
import { PropertiesModule } from './properties/properties.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';
import { SalesModule } from './sales/sales.module';
import { SaleContentsModule } from './sale-contents/sale-contents.module';
import { UsersModule } from './users/users.module';
import { TokensModule } from './tokens/tokens.module';
import { PrismaService } from 'prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { ContactsModule } from './contacts/contacts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
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
  providers: [PrismaService],
})
export class AppModule {}
