import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { coursesAPI } from '../services/api';

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedCourses();
  }, []);

  const loadFeaturedCourses = async () => {
    try {
      const { data } = await coursesAPI.getAllCourses({ featured: 'true' });
      setFeaturedCourses(data.courses.slice(0, 3));
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-black) 0%, var(--primary-dark) 50%, var(--accent-red) 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{
            display: 'inline-block',
            background: 'var(--primary-gold)',
            color: 'var(--primary-black)',
            padding: '8px 20px',
            borderRadius: '25px',
            fontWeight: 'bold',
            marginBottom: '20px',
            animation: 'pulse 2s infinite'
          }}>
            ⚡ Special Offer
          </div>

          <h1 style={{
            fontSize: '48px',
            marginBottom: '20px',
            lineHeight: '1.2'
          }}>
            Master English with
            <br />
            <span style={{ color: 'var(--primary-gold)' }}>Alumni by Better</span>
          </h1>

          <p style={{
            fontSize: '20px',
            marginBottom: '40px',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Transform your career and life with our comprehensive English courses.
            Native teachers, proven methods, and lifetime access.
          </p>

          <Link to="/courses" className="btn btn-primary" style={{
            display: 'inline-block',
            padding: '18px 50px',
            fontSize: '20px',
            textDecoration: 'none',
            marginRight: '10px'
          }}>
            Browse Courses
          </Link>
        </div>
      </section>

      {/* Featured Courses */}
      <section style={{ padding: '80px 20px', background: 'var(--gray-50)' }}>
        <div className="container">
          <h2 className="text-center" style={{
            fontSize: '36px',
            marginBottom: '50px',
            color: 'var(--primary-black)'
          }}>
            Featured <span style={{ color: 'var(--accent-red)' }}>Courses</span>
          </h2>

          {loading ? (
            <div className="text-center">
              <div className="spinner"></div>
              <p>Loading courses...</p>
            </div>
          ) : featuredCourses.length > 0 ? (
            <div className="grid grid-cols-3" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px'
            }}>
              {featuredCourses.map(course => (
                <div key={course._id} className="card" style={{
                  background: 'white',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s'
                }}>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>
                      {course.title}
                    </h3>
                    <p style={{ color: 'var(--gray-600)', marginBottom: '15px' }}>
                      {course.shortDescription || course.description.substring(0, 100) + '...'}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        {course.discount > 0 ? (
                          <>
                            <span style={{
                              textDecoration: 'line-through',
                              color: 'var(--gray-400)',
                              marginRight: '10px'
                            }}>
                              ${course.price}
                            </span>
                            <span style={{
                              color: 'var(--bright-red)',
                              fontSize: '24px',
                              fontWeight: 'bold'
                            }}>
                              ${course.discountedPrice}
                            </span>
                          </>
                        ) : (
                          <span style={{
                            color: 'var(--primary-black)',
                            fontSize: '24px',
                            fontWeight: 'bold'
                          }}>
                            ${course.price}
                          </span>
                        )}
                      </div>
                      <Link
                        to={`/courses/${course.slug}`}
                        className="btn btn-primary"
                        style={{
                          padding: '10px 20px',
                          fontSize: '14px',
                          textDecoration: 'none'
                        }}
                      >
                        View Course
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p>No featured courses available at the moment.</p>
              <Link to="/courses" className="btn btn-primary" style={{
                marginTop: '20px',
                display: 'inline-block',
                textDecoration: 'none'
              }}>
                Browse All Courses
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '80px 20px' }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: '36px', marginBottom: '50px' }}>
            Why Choose <span style={{ color: 'var(--accent-red)' }}>Alumni by Better?</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            <div className="text-center" style={{ padding: '30px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>👨‍🏫</div>
              <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Native Teachers</h3>
              <p style={{ color: 'var(--gray-600)' }}>
                Learn from certified native English speakers with years of experience
              </p>
            </div>

            <div className="text-center" style={{ padding: '30px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📱</div>
              <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Learn Anywhere</h3>
              <p style={{ color: 'var(--gray-600)' }}>
                Access courses on any device - mobile, tablet, or desktop
              </p>
            </div>

            <div className="text-center" style={{ padding: '30px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏰</div>
              <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Flexible Schedule</h3>
              <p style={{ color: 'var(--gray-600)' }}>
                Study at your own pace, whenever and wherever you want
              </p>
            </div>

            <div className="text-center" style={{ padding: '30px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎓</div>
              <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Proven Method</h3>
              <p style={{ color: 'var(--gray-600)' }}>
                Our approach has helped 50,000+ students achieve fluency
              </p>
            </div>

            <div className="text-center" style={{ padding: '30px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>💬</div>
              <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Live Practice</h3>
              <p style={{ color: 'var(--gray-600)' }}>
                Join conversation groups and practice with other learners
              </p>
            </div>

            <div className="text-center" style={{ padding: '30px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📊</div>
              <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Track Progress</h3>
              <p style={{ color: 'var(--gray-600)' }}>
                Monitor your improvement with detailed analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, var(--accent-red) 0%, var(--primary-black) 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '42px', marginBottom: '20px' }}>
            Ready to Start Your English Journey?
          </h2>
          <p style={{ fontSize: '20px', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px' }}>
            Join thousands of successful students who transformed their lives with English.
          </p>
          <Link to="/courses" className="btn btn-primary" style={{
            display: 'inline-block',
            textDecoration: 'none',
            padding: '18px 50px',
            fontSize: '20px'
          }}>
            Browse All Courses
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
