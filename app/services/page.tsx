import Link from "next/link";
import React from "react";

function Services() {
  return (
    <div>
      <h1>Our Services</h1>
      <br />
      <p>
        At Happy Tails, we are dedicated to providing top-quality care for your
        beloved pets. Our comprehensive range of services ensures that all your
        pet's needs are met under one roof, whether you're looking for a safe
        place for your pet while you're away, grooming services, or training
        programs.
      </p>
      <br />
      <h2>
        <Link href="/services/dog-boarding">Dog Boarding</Link>
      </h2>
      <p>
        Our dog boarding services offer a home away from home for your dogs.
        They'll enjoy spacious accommodations, regular exercise, and plenty of
        playtime with our experienced staff.
      </p>
      <br />
      <h2>
        <Link href="/services/cat-boarding">Cat Boarding</Link>
      </h2>
      <p>
        Cats have their own quiet and comfortable area away from dogs. Our cat
        boarding includes individual attention, climbing structures, and cozy
        resting areas to keep your feline friend calm and happy.
      </p>
      <br />
      <h2>
        <Link href="/services/dog-daycare">Doggy Daycare</Link>
      </h2>
      <p>
        Perfect for busy pet owners, our doggy daycare provides your dogs with
        socialization, exercise, and stimulation they need to stay healthy and
        happy during the day.
      </p>
      <br />
      <h2>
        <Link href="/services/grooming">Grooming</Link>
      </h2>
      <p>
        Our professional grooming services cater to both dogs and cats,
        including baths, haircuts, nail trimming, and ear cleaning to keep your
        pet looking and feeling their best.
      </p>
      <br />
      <h2>
        <Link href="/services/training">Training</Link>
      </h2>
      <p>
        We offer a range of training classes for all ages and levels, from basic
        obedience to advanced tricks, helping to enhance the bond between you
        and your pet.
      </p>
      <br />
      <h2>
        <Link href="/services/other-services">Additional Services</Link>
      </h2>
      <p>
        Beyond the basics, we provide specialized services such as pet
        photography, health monitoring, and a membership program that offers
        exclusive benefits and discounts.
      </p>
      <br />
      <p>
        At Happy Tails, every pet receives individualized care tailored to their
        specific needs. Our trained and compassionate staff are committed to the
        health, safety, and happiness of your pets. Contact us today to learn
        more about how we can help you and your furry family member.
      </p>
    </div>
  );
}

export default Services;
