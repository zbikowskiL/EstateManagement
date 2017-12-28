using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace EstateManagement.Migrations
{
    public partial class SeedingDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Adresses(Street, City) VALUES ('Lipowa', 'Pisz')");
            migrationBuilder.Sql("INSERT INTO Adresses(Street, City) VALUES ('Grunwaldzka', 'Gdansk')");
            migrationBuilder.Sql("INSERT INTO Adresses(Street, City) VALUES ('Matejki', 'Pisz')");

            migrationBuilder.Sql("INSERT INTO Owners(Name, Surname, Phone) VALUES ('Lukasz', 'Zbikowski', '516000001')");
            migrationBuilder.Sql("INSERT INTO Owners(Name, Surname, Phone) VALUES ('Ariel', 'Wykow', '516000002')");
            migrationBuilder.Sql("INSERT INTO Owners(Name, Surname, Phone) VALUES ('Dariusz', 'Sienkiewicz', '516000003')");


            migrationBuilder.Sql("INSERT INTO Properties(Type, Description, Rooms, Area, Washer, Refrigerator, Iron, AdressId, OwnerId) VALUES (0, 'Opis_1', 7, 170, 1, 1, 1, 1, 1)");
            migrationBuilder.Sql("INSERT INTO Properties(Type, Description, Rooms, Area, Washer, Refrigerator, Iron, AdressId, OwnerId) VALUES (1, 'Opis_2', 2, 39, 1, 0, 1, 2, 2)");
            migrationBuilder.Sql("INSERT INTO Properties(Type, Description, Rooms, Area, Washer, Refrigerator, Iron, AdressId, OwnerId) VALUES (0, 'Opis_3', 9, 200, 0, 1, 1, 3, 3)");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Owners");
            migrationBuilder.Sql("DELETE FROM Adresses");
            migrationBuilder.Sql("DELETE FROM Properties");

        }
    }
}
